import Form from '../Form/Form';

function RegisterWithForm(props) {
  return (
    <>
      <Form
        {...props}
        header={props.header}
        formName="register"
        greeting="Добро пожаловать!"
        onSubmit={props.onSubmit}
        inputs={[
          {
            onChange: (e) => console.log(e.target.value),
            type: 'text',
            id: 'name',
            name: 'name',
            label: 'Имя',
            minLength:2,
            maxLength:30,
            autocomplete:"username ",
          },
          {
            onChange: (e) => console.log(e.target.value),
            type: 'email',
            id: 'email',
            name: 'email',
            label: 'E-mail',
            autocomplete:"email",
          },
          {
            onChange: (e) => console.log(e.target.value),
            type: 'password',
            id: 'password',
            name: 'password',
            label: 'Пароль',
            minLength:3,
            maxLength:30,
            autocomplete:"new-password",
          },
        ]}
        button="Зарегистрироваться"
        entryText="Уже зарегистрированы?"
        entryLinkPath="/signin"
        entryLinkText="Войти"
      />
    </>
  );
}

export default RegisterWithForm;
