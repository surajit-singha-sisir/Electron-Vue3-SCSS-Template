import axios from 'axios'

export function useImageUploader() {
  const uploadImage = async (file: File): Promise<string | null> => {
    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await axios.post('http://192.168.0.111:8000/api/img_upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      if (response.data && response.data.status === 'success' && response.data.image_url) {
        return response.data.image_url // return the relative image URL string
      }
      return null
    } catch (error) {
      console.error('Image upload failed:', error)
      return null
    }
  }

  return {
    uploadImage
  }
}
