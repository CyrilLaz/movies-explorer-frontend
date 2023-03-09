import Form from '../Form/Form';

function RegisterWithForm(props) {
  return (
    <>
      <Form
        {...props}
        header={props.header}
        formName="register"
        greeting="Добро пожаловать!"
        onSubmit={(e) => {
          e.preventDefault();
          console.log('регистрация');
        }}
        inputs={[
          {
            onChange: (e) => console.log(e.target.value),
            type: 'text',
            id: 'name',
            name: 'name',
            label: 'Имя',
          },
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
        button="Зарегистрироваться"
        entryText="Уже зарегистрированы?"
        entryLinkPath="/signin"
        entryLinkText="Войти"
      />
    </>
  );
}

export default RegisterWithForm;
