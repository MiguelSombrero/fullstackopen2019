import React from 'react'
import Countries from './Countries'
import Country from "./Country"

const Content = (props) => (props.countries.length > 10)
    ? <p>Too many matches, try another filter</p>
    : (props.countries.length === 1)
    ? <Country country={props.countries[0]} />
    : <Countries countries={props.countries} onChange={props.onChange} />

export default Content