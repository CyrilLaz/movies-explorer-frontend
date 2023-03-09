import Form from '../Form/Form';

function LoginWithForm(props) {
  return (
    <>
      <Form
        header={props.header}
        formName="login"
        greeting="Рады видеть!!"
        onSubmit={(e) => {
          e.preventDefault();
          console.log('login');
        }}
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
