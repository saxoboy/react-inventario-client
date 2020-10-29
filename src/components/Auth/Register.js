import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

/* MUI */
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/core/Alert";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

/* APOLLO */
import { useMutation } from "@apollo/client";
import { USER_REGISTER } from "../../graphql/users";

// validamos forms
const schema = yup.object().shape({
  name: yup
    .string()
    .required("name is required")
    .min(4, "Mínimo 4 carácteres")
    .matches(
      /^[ÁÉÍÓÚA-Z][a-záéíóú]+(\s+[ÁÉÍÓÚA-Z]?[a-záéíóú]+)*$/,
      "name no puede tener espacios, numeros y debe empezar con mayúscula"
    ),
  username: yup
    .string()
    .required("is required")
    .matches(
      /^[a-zA-Z0-9-]*$/i,
      "El nombre del usuario no puede tener espacio ni carcteres especiales"
    ),
  email: yup
    .string()
    .required("is required")
    .email("Ingrese un email válido")
    .matches(
      /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/,
      "Email no es valido"
    ),
  password: yup
    .string()
    .required("is required")
    .min(6, "Mínimo 6 carácteres")
    .oneOf([yup.ref("passwordConfirm")], "Las contraseñas no coinciden"),
  passwordConfirm: yup
    .string()
    .required("is required")
    .min(6, "Mínimo 6 carácteres")
    .oneOf([yup.ref("password")], "Las contraseñas no coinciden"),
});

// Mensaje de Alerta para errores
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Register = (props) => {
  const classes = useStyles(); //MUI syles
  const { setShowLogin } = props;
  const [open, setOpen] = React.useState(false);
  const [isOk, setIsOk] = React.useState(false);
  const [error, setError] = React.useState("");
  const [createUser] = useMutation(USER_REGISTER);
  //config YUP
  const { handleSubmit, register, errors } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });
  //enviamos form
  const onSubmit = async (data) => {
    try {
      const newUser = data;
      delete newUser.passwordConfirm; // borramos confirmar password
      const result = await createUser({
        variables: { input: newUser },
      });
      //console.log(result);
      // result ok
      const ok = result.data.createUser.ok;
      const message = result.data.createUser.message;

      // si ok es falso
      if (ok) {
        setOpen(true);
        setIsOk(ok);
        setError(message);
        setTimeout(() => { //despues de 4 seg cambia estado y redirecciona el form
          setShowLogin(true); 
        }, 4000);
      } else {
        setOpen(true);
        setIsOk(ok);
        setError(message);
        setShowLogin(false); //cambia estado y redirecciona el form  
      }
    } catch (error) {
      setOpen(true);
      setError(error.message);
      console.log(error.message);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={10000}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        {isOk ? (
          <Alert
            onClose={handleClose}
            severity="success"
            className={classes.alert}
          >
            {error}
          </Alert>
        ) : (
          <Alert
            onClose={handleClose}
            severity="error"
            className={classes.alert}
          >
            {error}
          </Alert>
        )}
      </Snackbar>
      <TextField
        inputRef={register}
        variant="outlined"
        margin="normal"
        id="name"
        label="Name"
        name="name"
        helperText={errors?.name?.message}
        error={!!errors.name}
        autoFocus
        fullWidth
      />
      <TextField
        inputRef={register}
        variant="outlined"
        margin="normal"
        id="username"
        label="Username"
        name="username"
        helperText={errors?.username?.message}
        error={!!errors.username}
        fullWidth
      />
      <TextField
        inputRef={register}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email"
        name="email"
        autoComplete="email"
        helperText={errors?.email?.message}
        error={!!errors.email}
      />
      <TextField
        inputRef={register}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        helperText={errors?.password?.message}
        error={!!errors.password}
      />
      <TextField
        inputRef={register}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="passwordConfirm"
        label="Confirm Password"
        type="password"
        id="passwordConfirm"
        helperText={errors?.passwordConfirm?.message}
        error={!!errors.passwordConfirm}
      />
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Register
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            type="reset"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Register;

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE11 issue.
    maxWidth: "22rem",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert: {
    width: "100%",
  },
}));
