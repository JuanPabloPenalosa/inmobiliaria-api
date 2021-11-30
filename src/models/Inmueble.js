import { Schema, model } from "mongoose";

const inmuebleSchema = new Schema(
  {
    Departamento: String,
    Ciudad: String,
    Direccion: String,
    ValorInmueble: Number,
    TipoInmueble: String,
    TipoOferta: String,
    ImagenesURL: String,
    VideoURL: String,
    advisor: 
      {
        type: Schema.Types.ObjectId, ref: "User",
      },
  },
  
  {
    timestamps: true,
    versionKey: false
  }
);

export default model("Inmueble", inmuebleSchema);
