import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
/* MUI */
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

import { useMutation } from "@apollo/client";
import { USER_UPDATE_AVATAR } from "../../graphql/users";

const AvatarModal = ({ openAvatar, handleCloseAvatar }) => {
  const classes = useStyles();
  const [updateUserAvatar] = useMutation(USER_UPDATE_AVATAR);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];
      console.log(file);
      try {
        const result = await updateUserAvatar({ variables: { file } });
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    },
    [updateUserAvatar]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  return (
    <Dialog
      open={openAvatar}
      onClose={handleCloseAvatar}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Edit My Avatar</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Arrastre una nueva imagen o seleccione una nueva foto de perfil
        </DialogContentText>
        <Paper
          className={classes.upload}
          onClick={handleCloseAvatar}
          elevation={0}
          {...getRootProps()}
        >
          <CloudUploadIcon color="primary" className={classes.iconUpload} />
          <input {...getInputProps()} />
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleCloseAvatar}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleCloseAvatar}
        >
          Eliminar Actual
        </Button>      
      </DialogActions>
    </Dialog>
  );
};

export default AvatarModal;

const useStyles = makeStyles((theme) => ({
  upload: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    cursor: "pointer",
    padding: theme.spacing(2),
    border: "1px dashed #ccc",
    height: "180px",
    transitionProperty: "box-shadow",
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
    "&:hover": {
      opacity: 0.8,
    },
  },
  iconUpload: {
    fontSize: "5em",
  },
}));
