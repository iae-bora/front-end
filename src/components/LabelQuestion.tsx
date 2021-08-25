import { InputHTMLAttributes } from 'react'

import '../styles/question.scss'

type LabelProps = InputHTMLAttributes<HTMLInputElement> & {
    text?: string
}

export function LabelQuestion(props: LabelProps){
    return(
        <>
        <label>
            <input className="answer" 
                   type ="radio" 
                   key ={props.text} 
                   value={props.text} 
                   {...props}
            /> {props.text}
        </label>
        <br/>
        </>
    )
}