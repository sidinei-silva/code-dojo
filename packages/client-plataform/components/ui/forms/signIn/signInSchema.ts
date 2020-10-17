import Yup from '../../../../utils/yupTranslate';

const userSchema = Yup.object().shape({
  email: Yup.string().email().required().label('Email'),
  password: Yup.string().min(6).required().label('Senha')
});

export default userSchema;
