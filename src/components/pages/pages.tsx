
/** @jsx jsx */
/** @jsxFrag */

import {jsx} from 'theme-ui';

const Pages = (props) => {
    console.log(props.pageContext)
  return (
    <main className={props.className}>
        {JSON.stringify(props.pageContext)}
        {props.children}

    </main>
  )
}

export default Pages