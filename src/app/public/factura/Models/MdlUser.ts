export class MdlUser {
    public USUARIO: String = "";
    public PASSS: String = "";
    public Activotoken: String = "";

    get_USUARIO(): String {
        return this.USUARIO;
    }

    set_USUARIO(value: String) {
        this.USUARIO = value;
    }

    get_PASSS(): String {
        return this.PASSS;
    }

    set_PASSS(value: String) {
        this.PASSS = value;
    }

    get_tokken(): String {
        return this.Activotoken;
    }

    set_tokken(value?: String) {
        this.Activotoken = value;
    }
}