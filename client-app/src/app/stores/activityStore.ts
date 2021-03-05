import {makeAutoObservable } from "mobx"
import agent from "../api/agent"
import { Activity } from "../models/activity"

export default class ActivityStore {
    activities: Activity[] = []
    selectedActivity: Activity | null = null
    editMode= false
    loading = false
    initialLoading = false
    
    constructor(){
        makeAutoObservable(this)
    }

    loadActivities= async ()=> {
        this.initialLoading = true
        try {
            const activities= await agent.Activities.list();
            activities.forEach(act => {
                act.date=act.date.split('T')[0]
                this.activities.push(act)
            })
            this.initialLoading = false
        }catch(error) {
            console.log(error)
            this.initialLoading = false
        }
    }
}