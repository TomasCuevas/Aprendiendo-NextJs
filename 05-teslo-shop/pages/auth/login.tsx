import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import NextLink from "next/link";
import { getSession, signIn, getProviders } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";

//* icons *//
import { ErrorOutline } from "@mui/icons-material";

//* layout *//
import { AuthLayout } from "../../components/layouts/AuthLayout";

//* utils *//
import { isEmail } from "../../utils/validations";

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const [showError, setShowError] = useState(false);
  const [providers, setProviders] = useState<any>({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    getProviders().then((prov) => {
      setProviders(prov);
    });
  }, []);

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);

    await signIn("credentials", { email, password });
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
              <Chip
                label="No reconocemos ese usuario / contraseña"
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{ display: showError ? "flex" : "none" }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Correo electronico"
                variant="filled"
                fullWidth
                {...register("email", {
                  required: "Este campo es requerido",
                  validate: isEmail,
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
                color="secondary"
                className="circular-btn"
                size="large"
                type="submit"
                fullWidth
              >
                Ingrsar
              </Button>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink
                href={
                  router.query?.p
                    ? `/auth/register?p=${router.query.p}`
                    : "/auth/register"
                }
                passHref
              >
                <Link underline="always">¿No tienes cuenta?</Link>
              </NextLink>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            display="flex"
            flexDirection="column"
            alignItems="end"
          >
            <Divider sx={{ width: "100%", mt: 3 }} />
            {Object.values(providers).map((provider: any) => {
              if (provider.id! === "credentials")
                return <div key={provider.id}></div>;

              return (
                <Button
                  key={provider.id}
                  variant="outlined"
                  fullWidth
                  color="primary"
                  sx={{ mb: 1 }}
                  onClick={() => signIn(provider.id)}
                >
                  {provider.name}
                </Button>
              );
            })}
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = await getSession({ req });
  const { p = "/" } = query;

  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default LoginPage;
