import Inmueble from "../models/Inmueble";

export const createInmueble = async (req, res) => {
  const { Departamento,Ciudad,Direccion,ValorInmueble,TipoInmueble,TipoOferta,ImagenesURL,VideoURL, } = req.body;

  try {
    const newInmueble = new Inmueble({
      Departamento,
      Ciudad,
      Direccion,
      ValorInmueble,
      TipoInmueble,
      TipoOferta,
      ImagenesURL,
      VideoURL,
    });

    const inmuebleSaved = await newInmueble.save();

    res.status(201).json(inmuebleSaved);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getInmuebleById = async (req, res) => {
  const { inmuebleId } = req.params;

  const inmueble = await Inmueble.findById(inmuebleId);
  res.status(200).json(inmueble);
};

export const getInmuebles = async (req, res) => {
  const inmuebles = await Inmueble.find();
  return res.json(inmuebles);
};

export const updateInmuebleById = async (req, res) => {
  const updatedInmueble = await Inmueble.findByIdAndUpdate(
    req.params.inmuebleId,
    req.body,
    {
      new: true,
    }
  );
  res.status(204).json(updatedInmueble);
};

export const deleteInmuebleById = async (req, res) => {
  const { inmuebleId } = req.params;

  await Inmueble.findByIdAndDelete(inmuebleId);

  // code 200 is ok too
  res.status(204).json();
};
