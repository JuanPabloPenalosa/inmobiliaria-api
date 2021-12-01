import User from "../models/User";
import Role from "../models/Role";
import Inmueble from "../models/Inmueble";
import Solicitud from "../models/Solicitud";

export const createSolicitud = async (req, res) => {
  try {
    const EstadoSolicitud = req.body.EstadoSolicitud;
    const inmueble = req.body.inmueble;
    const user = req.body.user;
    const advisor = req.body.advisor;

    // Creando una nueva solicitud
    const solicitud = new Solicitud({
      EstadoSolicitud,
      inmueble,
      user,
      advisor,
    });

    // Guardando el nuevo user
    const savedSolicitud = await solicitud.save();

    return res.status(200).json(savedSolicitud);
  } catch (error) {
    console.error(error);
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getSolicitudById = async (req, res) => {
  const { solicitudId } = req.params;

  const solicitud = await Solicitud.findById(solicitudId);
  res.status(200).json(solicitud);
};

export const getSolicitudes = async (req, res) => {
  const solicitudes = await Solicitud.find();
  return res.json(solicitudes);
};

export const updateSolicitudById = async (req, res) => {
  const updatedSolicitud = await Solicitud.findByIdAndUpdate(
    req.params.solicitudId,
    req.body,
    {
      new: true,
    }
  );
  res.status(204).json(updatedSolicitud);
};

export const deleteSolicitudById = async (req, res) => {
  const { solicitudId } = req.params;

  await Solicitud.findByIdAndDelete(solicitudId);

  // código 200 is ok tambien
  res.status(204).json();
};
