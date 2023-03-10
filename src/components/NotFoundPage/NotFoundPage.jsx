import './NotFoundPage.css';

function NotFoundPage() {
  return (
    <div className="not-found">
      <div className="not-found__message">
        <span className="not-found__status-code">404</span>
        <span className="not-found__status-message">Страница не найдена</span>
      </div>

      <button className='not-found__back-button' onClick={() => console.log('Click back')}>Назад</button>
    </div>
  );
}

export default NotFoundPage;
