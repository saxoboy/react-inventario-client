import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

/* MUI */
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/core/Alert";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

/* APOLLO */
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../graphql/users";
import { setToken } from "../../utils/token";
import useAuth from "../../hooks/useAuth";

// validamos forms
const schema = yup.object().shape({
  email: yup
    .string()
    .required("is required")
    .email("Ingrese un email válido")
    .matches(
      /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/,
      "Email no es valido"
    ),
  password: yup.string().required("is required"),
});

// Mensaje de Alerta para errores
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
  const classes = useStyles(); // MUI styles
  const { setUser } = useAuth(); // context de usuario logeado
  const [open, setOpen] = React.useState(false);
  const [isOk, setIsOk] = React.useState(false);
  const [error, setError] = React.useState("");
  const [login] = useMutation(LOGIN);
  //config YUP
  const { handleSubmit, register, errors } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    try {
      const loginUser = data;
      const result = await login({
        variables: { input: loginUser },
      });

      const { ok, message, token } = result.data.login;

      // si ok es falso
      if (ok) {
        setOpen(true);
        setIsOk(ok);
        setError(message);
        setToken(token);
        setUser(token)
      } else {
        setOpen(true);
        setIsOk(ok);
        setError(message);
      }
    } catch (err) {
      console.log(err.message);
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
        autoHideDuration={2000}
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
        helperText={errors?.email?.message}
        error={!!errors.email}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email"
        name="email"
        autoComplete="email"
        autoFocus
      />
      <TextField
        inputRef={register}
        helperText={errors?.password?.message}
        error={!!errors.password}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        className={classes.submit}
      >
        Log In
      </Button>
    </form>
  );
};

export default Login;

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE11 issue.
    maxWidth: "22rem",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
