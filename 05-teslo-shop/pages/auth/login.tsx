import NextLink from "next/link";
import { useForm } from "react-hook-form";
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";

//* layout *//
import { AuthLayout } from "../../components/layouts";

//* utils *//
import { validations } from "../../utils";

//* api *//
import { tesloApi } from "../../api";

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onLoginUser = async ({ email, password }: FormData) => {
    try {
      const { data } = await tesloApi.post("/user/login", { email, password });
      const { token, user } = data;

      console.log(token, user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthLayout title="Ingresar">
      <form onSubmit={handleSubmit(onLoginUser)}>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Iniciar Sesion
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Correo electronico"
                variant="filled"
                fullWidth
                {...register("email", {
                  required: "Este campo es requerido",
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Contraseña"
                type="password"
                variant="filled"
                fullWidth
                {...register("password", {
                  required: "Este campo es requerido",
                  minLength: { value: 6, message: "Minimo 6 caracteres" },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                color="primary"
                className="circular-btn"
                size="large"
                type="submit"
                fullWidth
              >
                Ingrsar
              </Button>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink href="/auth/register" passHref>
                <Link>No tienes cuenta?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
