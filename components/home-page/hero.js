import Image from 'next/image'
import classes from './hero.module.css'

const Hero = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/harold.jpeg"
          alt="An image showing Harold"
          width={273}
          height={434}
        />
      </div>
      <h1>Hi, I'm Harold</h1>
      <p>
        I blog about web development - especially frontend frameworks like
        Reactjs/Nextjs
      </p>
    </section>
  )
}

export default Hero
