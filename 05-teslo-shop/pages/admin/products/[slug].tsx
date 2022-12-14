import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import {
  Box,
  Button,
  capitalize,
  Card,
  CardActions,
  CardMedia,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  ListItem,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

//* database *//
import ProductModel from "../../../database/models/Product";

//* layout *//
import { AdminLayout } from "../../../components/layouts/AdminLayout";

//* database *//
import { getProductBySlug } from "../../../database/dbProducts";

//* icons *//
import {
  DriveFileRenameOutline,
  SaveOutlined,
  UploadOutlined,
} from "@mui/icons-material";

//* valid data for form *//
const validTypes = ["shirts", "pants", "hoodies", "hats"];
const validGender = ["men", "women", "kid", "unisex"];
const validSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

//* api *//
import tesloApi from "../../../axios/tesloApi";

//* intefaces *//
import { IProduct } from "../../../interfaces/products";

interface FormData {
  _id?: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: string[];
  slug: string;
  tags: string[];
  title: string;
  type: string;
  gender: "men" | "women" | "kid" | "unisex";
}

interface ProductAdminPageProps {
  product: IProduct;
}

const ProductAdminPage: NextPage<ProductAdminPageProps> = ({ product }) => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [newTag, setNewTag] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    control,
    watch,
  } = useForm<FormData>({
    defaultValues: product,
  });

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === "title") {
        const newSlug =
          value.title
            ?.trim()
            .replaceAll(" ", "_")
            .replaceAll("'", "")
            .toLowerCase() || "";

        setValue("slug", newSlug);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  //* change size
  const onChangeSize = (size: string) => {
    const currentSizes = getValues("sizes");
    if (currentSizes.includes(size)) {
      return setValue(
        "sizes",
        currentSizes.filter((s) => s !== size),
        { shouldValidate: true }
      );
    }

    setValue("sizes", [...currentSizes, size], { shouldValidate: true });
  };

  //* add tag
  const onAddTag = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.code === "Space" && newTag.trim().length > 1) {
      const currentTags = getValues("tags");
      if (currentTags.includes(newTag.trim().toLowerCase())) return;

      setValue("tags", [...currentTags, newTag.trim().toLowerCase()]);
      setNewTag("");
    }
  };

  //* delete tag
  const onDeleteTag = (tag: string) => {
    const currentTags = getValues("tags");
    setValue(
      "tags",
      currentTags.filter((t) => t !== tag),
      { shouldValidate: true }
    );
  };

  //* update images
  const onFilesSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target.files || target.files.length === 0) return;

    try {
      for (const file of target.files) {
        const formData = new FormData();
        formData.append("file", file);
        const { data } = await tesloApi.post<{ message: string }>(
          "/admin/upload",
          formData
        );

        console.log(data.message);
        setValue("images", [...getValues("images"), data.message], {
          shouldValidate: true,
        });
      }
    } catch (error) {}
  };

  //* delete image
  const onDeleteImage = (image: string) => {
    setValue(
      "images",
      getValues("images").filter((img) => img !== image),
      { shouldValidate: true }
    );
  };

  //* submit form
  const onSubmitForm = async (form: FormData) => {
    if (form.images.length < 2) return;
    setIsSaving(true);

    try {
      const { data } = await tesloApi({
        url: "/admin/products",
        method: form._id ? "PUT" : "POST",
        data: form,
      });

      if (!form._id) {
        router.replace(`/admin/products/${data.slug}`);
      } else {
        setIsSaving(false);
      }
    } catch (error) {
      setIsSaving(false);
    }
  };

  return (
    <AdminLayout
      title={"Producto"}
      subtitle={`Editando: ${product.title}`}
      icon={<DriveFileRenameOutline />}
    >
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <Box display="flex" justifyContent="end" sx={{ mb: 1 }}>
          <Button
            color="secondary"
            startIcon={<SaveOutlined />}
            sx={{ width: "150px" }}
            type="submit"
            disabled={isSaving}
          >
            Guardar
          </Button>
        </Box>

        <Grid container spacing={2}>
          {/* Data */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="T??tulo"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register("title", {
                required: "Este campo es requerido",
                minLength: { value: 5, message: "M??nimo 5 caracteres" },
              })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />

            <TextField
              label="Descripci??n"
              variant="filled"
              fullWidth
              multiline
              sx={{ mb: 1 }}
              {...register("description", {
                required: "Este campo es requerido",
                minLength: { value: 5, message: "M??nimo 5 caracteres" },
              })}
              error={!!errors.description}
              helperText={errors.description?.message}
            />

            <TextField
              label="Inventario"
              type="number"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register("inStock", {
                required: "Este campo es requerido",
                min: { value: 0, message: "Minimo de valor 0" },
              })}
              error={!!errors.inStock}
              helperText={errors.inStock?.message}
            />

            <TextField
              label="Precio"
              type="number"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register("price", {
                required: "Este campo es requerido",
                min: { value: 0, message: "Valor minimo de $0" },
              })}
              error={!!errors.price}
              helperText={errors.price?.message}
            />

            <Divider sx={{ my: 1 }} />

            <Controller
              name="type"
              control={control}
              defaultValue={undefined}
              render={({ field }) => (
                <FormControl sx={{ mb: 1 }}>
                  <FormLabel>Tipo</FormLabel>
                  <RadioGroup row {...field}>
                    {validTypes.map((option) => (
                      <FormControlLabel
                        key={option}
                        value={option}
                        control={<Radio color="secondary" />}
                        label={capitalize(option)}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />

            <Controller
              name="gender"
              control={control}
              defaultValue={undefined}
              render={({ field }) => (
                <FormControl sx={{ mb: 1 }}>
                  <FormLabel>G??nero</FormLabel>
                  <RadioGroup row {...field}>
                    {validGender.map((option) => (
                      <FormControlLabel
                        key={option}
                        value={option}
                        control={<Radio color="secondary" />}
                        label={capitalize(option)}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />

            <FormGroup>
              <FormLabel>Tallas</FormLabel>
              {validSizes.map((size) => (
                <FormControlLabel
                  key={size}
                  control={
                    <Checkbox checked={getValues("sizes").includes(size)} />
                  }
                  label={size}
                  onChange={() => onChangeSize(size)}
                />
              ))}
            </FormGroup>
          </Grid>

          {/* Slug, Tags e Imagenes */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Slug - URL"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register("slug", {
                required: "Este campo es requerido",
                validate: (value) =>
                  value.includes(" ")
                    ? "No puede tener espacios en blanco"
                    : undefined,
              })}
              error={!!errors.slug}
              helperText={errors.slug?.message}
            />

            <TextField
              label="Etiquetas"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              helperText="Presiona [spacebar] para agregar"
              onKeyDown={onAddTag}
              onChange={({ target }) => setNewTag(target.value)}
              value={newTag}
            />

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                listStyle: "none",
                p: 0,
                m: 0,
              }}
              component="ul"
            >
              {getValues("tags").map((tag) => {
                return (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => onDeleteTag(tag)}
                    color="primary"
                    size="small"
                    sx={{ ml: 1, mt: 1 }}
                  />
                );
              })}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box display="flex" flexDirection="column">
              <FormLabel sx={{ mb: 1 }}>Im??genes</FormLabel>
              <Button
                color="secondary"
                fullWidth
                startIcon={<UploadOutlined />}
                sx={{ mb: 3 }}
                onClick={() => inputRef.current?.click()}
              >
                Cargar imagen
              </Button>
              <input
                type="file"
                multiple
                accept="image/png, image/gif, image/jpeg, image/jpg"
                style={{ display: "none" }}
                ref={inputRef}
                onChange={onFilesSelected}
              />

              {getValues("images").length < 2 && (
                <Chip
                  label="Es necesario al 2 imagenes"
                  color="error"
                  variant="outlined"
                />
              )}

              <Grid container spacing={2} sx={{ mt: 1 }}>
                {getValues("images").map((img) => (
                  <Grid item xs={4} sm={3} key={img}>
                    <Card>
                      <CardMedia
                        component="img"
                        className="fadeIn"
                        image={img}
                        alt={img}
                      />
                      <CardActions>
                        <Button
                          fullWidth
                          color="error"
                          onClick={() => onDeleteImage(img)}
                        >
                          Borrar
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </form>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug = "" } = query;

  let product: IProduct | null;

  if (slug === "new") {
    const tempProduct = JSON.parse(JSON.stringify(new ProductModel()));
    delete tempProduct._id;

    product = tempProduct;
  } else {
    product = await getProductBySlug(slug.toString());
  }

  if (!product) {
    return {
      redirect: {
        destination: "/admin/products",
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
  };
};

export default ProductAdminPage;
