import promoLogo from '../../images/promo-image.svg';
import './Promo.css';

export default function Promo() {
  return (
    <section className='promo'>
      <div className='promo__container'>
        <div>
          <h1 className='promo__title'>
            Учебный проект студента факультета Веб-разработки.
          </h1>
          <p className='promo__subtitle'>
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
        </div>
        <img className='promo__image' src={promoLogo} alt='Земной шар'></img>
      </div>
      <a
        className='link promo__link'
        href='#about-project'
      >
        Узнать больше
      </a>
    </section>
  );
}
