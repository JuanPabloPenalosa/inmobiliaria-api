import { Schema, model } from "mongoose";

const solicitudSchema = new Schema(
  {
    FechaSolicitud: String,
    EstadoSolicitud: String,
    //Tiene un inmueble asociado a la solicitud
    inmueble: [
      {
        type: Schema.Types.ObjectId,
        ref: "Inmueble",
      },
    ],
    //Tiene un cliente relacionado que hace la solicitud
    user: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    //Tiene un asesor relacionado
    advisor: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  
  {
    timestamps: true,
    versionKey: false
  }
);

export default model("Solicitud", solicitudSchema);
