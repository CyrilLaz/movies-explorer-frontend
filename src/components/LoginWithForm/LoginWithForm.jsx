import Form from '../Form/Form';

function LoginWithForm(props) {
  return (
    <>
      <Form
        header={props.header}
        formName="login"
        greeting="Рады видеть!!"
        onSubmit={props.onSubmit}
        inputs={[
          {
            onChange: (e) => console.log(e.target.value),
            type: 'email',
            id: 'email',
            name: 'email',
            label: 'E-mail',
          },
          {
            onChange: (e) => console.log(e.target.value),
            type: 'password',
            id: 'password',
            name: 'password',
            label: 'Пароль',
            autocomplete: 'current-password',
            minLength: 2,
            maxLength: 30,
          },
        ]}
        button="Войти"
        entryText="Ещё не зарегистрированы?"
        entryLinkPath="/signup"
        entryLinkText="Регистрация"
      />
    </>
  );
}

export default LoginWithForm;
