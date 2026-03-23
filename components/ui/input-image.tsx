import { useEffect, useState } from "react"

const ImageInput = ({ defaultImage, onFileSelect }: any) => {
    const [preview, setPreview] = useState<string | null>(defaultImage || null)
    const [file, setFile] = useState<File | null>(null)

    useEffect(() => {
        setPreview(defaultImage || null)
        setFile(null)
    }, [defaultImage])

    useEffect(() => {
        // Show preview for selected file
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => setPreview(reader.result as string)
            reader.readAsDataURL(file)
        }
    }, [file])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0]
        if (selected) {
            setFile(selected)
            onFileSelect(selected)
        }
    }

    return (
        <div>
            <label className="font-semibold mb-1 block">Image</label>
            <input type="file" accept="image/*" onChange={handleChange} className="block mb-2" />
            {preview && (
                <img
                    src={preview}
                    alt="Preview"
                    className="w-36 h-36 object-cover rounded-md border mt-1"
                />
            )}
        </div>
    )
}

export default ImageInput
