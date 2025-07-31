import { useForm } from "react-hook-form";
import axios from "../API/axios_config";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const AddSongs = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        // set data in formdata because of files
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("artist", data.artist);
        formData.append("mood", data.songType);
        formData.append("audio", data.audio[0]);
        if (data.image?.[0]) {
            formData.append("image", data.image[0]);
        }
        try {
            const res = await axios.post("/songs", formData);
            toast.success("song uploaded successfully");
            navigate("/songs_library");
        } catch (error) {
            toast.error("unable to add song");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="addSongs_wrapper">
            <p className="go_home">
                <Link to="/">Back to Home</Link>
            </p>
            <div className="add-song-container">
                {" "}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="add-song-form"
                >
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            placeholder="song name"
                            type="text"
                            {...register("title", {
                                required: "Title is required",
                            })}
                        />
                        {errors.title && (
                            <p className="error">{errors.title.message}</p>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Artist</label>
                        <input
                            placeholder="artist name"
                            type="text"
                            {...register("artist", {
                                required: "Artist is required",
                            })}
                        />
                        {errors.artist && (
                            <p className="error">{errors.artist.message}</p>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Song Type</label>
                        <select
                            {...register("songType", {
                                required: "Song type is required",
                            })}
                        >
                            <option value="">Select Type</option>
                            <option value="angry">Angry</option>
                            <option value="sad">Sad</option>
                            <option value="happy">Happy</option>
                            <option value="neutral">Neutral</option>
                        </select>
                        {errors.songType && (
                            <p className="error">{errors.songType.message}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Upload Audio File</label>
                        <input
                            type="file"
                            accept=".mp3"
                            {...register("audio", {
                                required: "MP3 file is required",
                                validate: {
                                    isMp3: (fileList) => {
                                        const file = fileList[0];
                                        if (!file)
                                            return "MP3 file is required";

                                        const isMp3Ext = /\.mp3$/i.test(
                                            file.name
                                        );
                                        const isMp3Mime =
                                            file.type === "audio/mpeg";

                                        return isMp3Ext && isMp3Mime
                                            ? true
                                            : "Only valid .mp3 files are allowed";
                                    },
                                },
                            })}
                        />
                        {errors.audio && (
                            <p className="error">{errors.audio.message}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Upload Image (optional)</label>
                        <input
                            type="file"
                            accept=".jpg,.jpeg,.png,.webp,.gif"
                            {...register("image")}
                        />
                    </div>

                    <button type="submit" className="submit-btn">
                        Upload Song
                    </button>
                    {loading && <p className="loader">Uploading song...</p>}
                </form>
            </div>
        </div>
    );
};

export default AddSongs;
