new Vue({
    el: "#app",
    data: {
        full_name: "",
        email: "",
        phone_number: "",
        affair: "",
        message: "",
        errorMessage: "",
        apiUrl: "http://127.0.0.1:5000",
    },
    methods: {
        async handleSubmit() {
            // Validación antes de enviar
            if (!this.full_name || !this.email || !this.phone_number || !this.affair || !this.message) {
                this.errorMessage = "Faltan datos para el registro";
                return;
            }

            try {
                const response = await axios.post(`${this.apiUrl}/contact`, {
                    full_name: this.full_name,
                    email: this.email,
                    phone_number: this.phone_number,
                    affair: this.affair,
                    message: this.message,
                });

                if (response.data.message === 'Mensaje enviado con éxito') {
                    alert("¡Tu mensaje ha sido enviado con éxito!");
                    // Limpiar el formulario después de enviar
                    this.full_name = "";
                    this.email = "";
                    this.phone_number = "";
                    this.affair = "";
                    this.message = "";
                    this.errorMessage = "";
                } else {
                    this.errorMessage = response.data.message;
                }
            }
            catch (error) {
                if (error.response && error.response.data && error.response.data.message) {
                    this.errorMessage = error.response.data.message;
                } else {
                    this.errorMessage = "Error al enviar el mensaje. Por favor, inténtelo de nuevo.";
                }
                console.error("Error:", error);
            }
        }
    }
});