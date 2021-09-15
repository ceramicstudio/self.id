import React from 'react'
import clsx from 'clsx'
import styles from './HomepageFeatures.module.css'

const FeatureList = [
  {
    title: 'Secure authentication',
    Svg: require('../../static/img/undraw_authentication.svg').default,
    description: (
      <>
        Self.ID authenticates users via their Ethereum Wallet, providing a secure and sovereign
        authentification method.
      </>
    ),
  },
  {
    title: 'A user profile for all apps',
    Svg: require('../../static/img/undraw_profile.svg').default,
    description: (
      <>
        Users can edit their profile directly using the Self.ID website, or any other application
        that whishes to support it.
      </>
    ),
  },
  {
    title: 'Open Data, for real',
    Svg: require('../../static/img/undraw_connected_data.svg').default,
    description: (
      <>
        Using Self.ID and its underlying technologies, users fully own the data they interact with.
      </>
    ),
  },
]

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  )
}
