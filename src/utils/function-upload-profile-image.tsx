const API_URL = import.meta.env.VITE_API_URL;

export const UploadProfileImage = async (userId: number, file: File) => {
  const formData = new FormData();
  formData.append('logo', file);

  const token = localStorage.getItem('token');
  if (!token) throw new Error('Token não encontrado');

  const response = await fetch(`${API_URL}/users/${userId}/profile-picture`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erro ao enviar imagem');
  }

  return await response.json();
}