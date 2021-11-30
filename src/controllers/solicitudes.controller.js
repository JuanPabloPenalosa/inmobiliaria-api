import User from "../models/User";
import Role from "../models/Role";
import Inmueble from "../models/Inmueble";
import Solicitud from "../models/Solicitud";

export const createSolicitud = async (req, res) => {
  try {
    const { FechaSolicitud, EstadoSolicitud, inmueble, user, advisor } = req.body;
    
    //Buscar Inmueble
    const inmuebleFound = await Inmueble.find({ name: { $in: inmueble } });
    //Buscar Cliente
    const userFound = await User.find({ name: { $in: user } });
    //Buscar Asesor
    const asesorFound = await User.find({ name: { $in: advisor } });

    // Creando una nueva solicitud
    const solicitud = new Solicitud({
      FechaSolicitud,
      EstadoSolicitud,
      inmueble: inmuebleFound.map((inmueble) => inmueble._id),
      user: userFound.map((user) => user._id),
      advisor: advisorFound.map((user) => user._id),
    });

    // Guardando el nuevo user
    const savedSolicitud = await solicitud.save();

    return res.status(200).json({
      _id: savedSolicitud._id,
      FechaSolicitud: savedSolicitud.FechaSolicitud,
      EstadoSolicitud: savedSolicitud.EstadoSolicitud,
      inmueble: savedSolicitud.inmueble,
      user: savedSolicitud.user,
      advisor: savedSolicitud.advisor,
    });
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
