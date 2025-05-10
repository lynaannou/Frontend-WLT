const axios = window.axios;


const API = axios.create({
  baseURL: "http://localhost:8080/api", // à adapter selon le port
});

export const login = (credentials) => API.post("/auth/login", credentials);
export const register = (user) => API.post("/auth/register", user);
export const getDeadline = () => API.get("/admin/deadline");
export const postDeadline = (data) => API.post("/admin/deadline", data);

export const getAllProfesseurs = () => API.get("/professeurs");
export const getProfesseur = (id) => API.get(`/professeurs/${id}`);
export const updateProfesseur = (id, data) => API.put(`/professeurs/${id}`, data);
export const deleteProfesseur = (id) => API.delete(`/professeurs/${id}`);

export const submitFiche = (data) => API.post("/voeux", data); // créer ou soumettre
export const getFiche = (idProf) => API.get(`/voeux/${idProf}`);
export const updateFiche = (idProf, data) => API.put(`/voeux/${idProf}`, data);
export const downloadFichePDF = (idProf) => API.get(`/voeux/pdf/${idProf}`, { responseType: 'blob' }); // pour téléchargement

export const sendMessage = (message) => API.post("/message/send", message);
export const getInbox = (id) => API.get(`/message/inbox/${id}`);
export const getSentMessages = (id) => API.get(`/message/sent/${id}`);
