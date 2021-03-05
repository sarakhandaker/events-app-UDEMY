import {makeAutoObservable } from "mobx"

export default class ActivityStore {
    title="hello from mobx"
    constructor(){
        makeAutoObservable(this)
    }

    setTitle=()=>{
        this.title= this.title + '!'
    }
}