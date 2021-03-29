import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/user";

export default class UserStore {
    user: User | null = null;

    constructor() {
        makeAutoObservable(this)
    }

    get isLoggedIn() {
        return !!this.user;
    }

    login = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.login(creds);
            // store.commonStore.setToken(user.token);
            // runInAction(() => this.user = user);
            // history.push('/activities');
            // store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }
}