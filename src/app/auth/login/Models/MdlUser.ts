export class MdlUser {
    public USUARIO: String = "";
    public PASSS: String = "";
    public tokken: string = localStorage.getItem('token') !== null ? localStorage.getItem('token') : "";
}