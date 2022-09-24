import NextLink from "next/link";
import { useForm } from "react-hook-form";
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";

//* layout *//
import { AuthLayout } from "../../components/layouts";

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

  const onLoginUser = (data: FormData) => {
    console.log(data);
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
                {...register("email")}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Contraseña"
                type="password"
                variant="filled"
                fullWidth
                {...register("password")}
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
