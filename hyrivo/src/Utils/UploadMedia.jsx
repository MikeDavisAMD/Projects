import { Box, ButtonBase, Card, CardMedia, Grid, Typography } from "@mui/material";
import React, { memo, useCallback, useState } from "react";
import { useThemeContext } from "./ThemeContext";
import Cropper from "react-easy-crop";
import { Delete, Done, Edit, Feed, Preview } from "@mui/icons-material";


const getCroppedImg = async (imageSrc, croppedAreaPixels) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
    );

    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            resolve({ blob, url });
        }, "image/jpeg");
    });
};

const createImage = (url) =>
    new Promise((resolve, reject) => {
        const img = new Image();
        img.addEventListener("load", () => resolve(img));
        img.addEventListener("error", (err) => reject(err));
        img.setAttribute("crossOrigin", "anonymous"); // to avoid CORS
        img.src = url;
    });

const ImageEditor = memo(({ fileUrl, crop, zoom, setCrop, setZoom, onCropComplete }) => {
    return (
        <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
            <Cropper
                image={fileUrl}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                restrictPosition={true}
                objectFit="contain"
                style={{
                    containerStyle: {
                        width: '100%',
                        height: '100%',
                    },
                    mediaStyle: {
                        objectFit: 'contain',
                        maxWidth: '100%',
                        maxHeight: '100%',
                    },
                }}
            />
        </Box>
    )
})


export const UploadMedia = ({ icon, onMediaChange }) => {
    const { theme } = useThemeContext()
    const [file, setFile] = useState(null)
    const [fileUrl, setFileurl] = useState(null)
    const [editImage, setEditImage] = useState(false)

    // Image cropping
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleFileChange = (e) => {
        const selectedFiles = e.target.files[0]
        if (!selectedFiles) return

        const url = URL.createObjectURL(selectedFiles)
        setFile(selectedFiles)
        setFileurl(url)
        if (onMediaChange) {
            if (!selectedFiles.type.startsWith("image/") && !selectedFiles.type.startsWith("video/")) {
                onMediaChange(url, selectedFiles.type, selectedFiles.name)
            } else {
                onMediaChange(url, selectedFiles.type)
            }
        }
    }

    const handleEditView = (e) => {
        e.preventDefault()
        if (file.type.startsWith('image/')) {
            setEditImage(true)
        } else {
            window.open(URL.createObjectURL(file), '_blank')
        }
    }

    const handleDone = async (e) => {
        e.preventDefault()
        if (editImage && croppedAreaPixels) {
            const { url } = await getCroppedImg(fileUrl, croppedAreaPixels)
            setFileurl(url)
            setEditImage(false)

            if (onMediaChange) onMediaChange(url, "image/jpeg")
        } else if (fileUrl && !croppedAreaPixels) {
            setEditImage(false)

            if (!fileUrl.type.startsWith("image/") && !fileUrl.type.startsWith("video/")) {
                if (onMediaChange) onMediaChange(URL.createObjectURL(fileUrl), file.type, file.name)
            } else {
                if (onMediaChange) onMediaChange(URL.createObjectURL(fileUrl), file.type)
            }
        } else {
            setEditImage(false)
        }
    }

    const handleDelete = (e) => {
        e.preventDefault()
        setFile(null)
    }

    const renderHeader = () => {
        if (!file) {
            return (
                <div class="header">
                    {icon} <p>Browse File to upload!</p>
                </div>
            )
        } else if (file.type.startsWith("image/")) {
            return (
                <Box>
                    <Card sx={{ borderRadius: '15px', background: theme.cardBg, border: theme.cardBorder, mb: 2 }}>
                        <CardMedia sx={{ height: { lg: 400, md: 400, sm: 300, xs: 160 }, width: { lg: 400, md: 400, sm: 300, xs: 160 } }}>
                            {editImage ? (
                                <ImageEditor fileUrl={fileUrl} zoom={zoom} crop={crop}
                                    setCrop={setCrop} setZoom={setZoom} onCropComplete={onCropComplete} />
                            ) : (
                                <img src={fileUrl} alt="Pic Post"
                                    style={{ maxWidth: 'auto', maxHeight: 'auto', height: 'inherit', width: 'inherit', borderRadius: '15px', }} />
                            )}
                        </CardMedia>
                    </Card>
                    {editImage && (
                        <>
                        <Box sx={{display:{lg:'block',md:'block',sm:'none',xs:'none'}}}>
                            <Typography variant="body2" sx={{
                                color: theme.secondaryText, textAlign: 'center', mb: 2,
                                fontSize: { lg: 12, md: 12, sm: 10, xs: 10 }
                            }}>
                                Use scroll from mouse / two finger swipe in mousepad to crop
                            </Typography>
                        </Box>
                        <Box sx={{display:{lg:'none',md:'none',sm:'block',xs:'block'}}}>
                            <Typography variant="body2" sx={{
                                color: theme.secondaryText, textAlign: 'center', mb: 2,
                                fontSize: { lg: 12, md: 12, sm: 10, xs: 10 }
                            }}>
                                zoom in or out to crop
                            </Typography>
                        </Box>
                        </>
                    )}
                </Box>
            )
        } else if (file.type.startsWith("video/")) {
            return (
                <Card sx={{ borderRadius: '15px', background: theme.cardBg, border: theme.cardBorder }}>
                    <CardMedia sx={{ height: { lg: 400, md: 400, sm: 235, xs: 250 }, width: { lg: 700, md: 700, sm: 400, xs: 250 } }}>
                        <video src={URL.createObjectURL(file)} controls
                            style={{ maxWidth: 'auto', maxHeight: 'auto', height: 'inherit', width: 'inherit', borderRadius: '15px', }} />
                    </CardMedia>
                </Card>
            )
        } else {
            return (
                <div class="header">
                    <Feed sx={{ color: theme.secondaryText, height: 100, width: 100 }} /> <p>PDF / Document</p>
                </div>
            )
        }
    }
    return (
        <>
            <style>{`
        .container {
          height: auto;
          width: auto;
          border-radius: 10px;
          box-shadow: 4px 4px 30px ${theme.shadow};
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 10px;
          gap: 5px;
          background-color: ${theme.background};
        }

        .header {
          flex: 1;
          width: 100%;
          padding: 50px 0;
          border: 2px dashed ${theme.secondaryText};
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }

        .header p {
          text-align: center;
          color: ${theme.secondaryText};
        }

        .footer {
          background-color: ${theme.cardBg};
          width: 98%;
          height: 40px;
          padding: 8px;
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${theme.secondaryText};
          border: none;
        }

        .footer p {
          flex: 1;
          text-align: center;
        }

        #file {
          display: none;
        }
      `}</style>

            <div class="container">
                {renderHeader()}
                <label for="file" class="footer">
                    <p>{file ? (
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container alignItems='center'>
                                <Grid size={1}>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                        <ButtonBase onClick={handleDelete} sx={{
                                            display: 'flex', color: theme.primaryText,
                                            flexDirection: 'column', justifyContent: 'flex-end',
                                            alignItems: 'center',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                color: theme.hoverAccent,
                                            }
                                        }}><Delete /></ButtonBase>
                                    </Box>
                                </Grid>
                                <Grid size={10}>
                                    <Box>{file.name}</Box>
                                </Grid>
                                <Grid size={1}>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <ButtonBase onClick={editImage ? handleDone : handleEditView} sx={{
                                            display: 'flex', color: theme.primaryText,
                                            flexDirection: 'column', justifyContent: 'flex-end',
                                            alignItems: 'center',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                color: theme.hoverAccent,
                                            }
                                        }}>{file.type.startsWith("image/") ?
                                            editImage ? <Done /> : <Edit /> : <Preview />}</ButtonBase>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    ) : "Not selected file"}</p>
                </label>
                <input id="file" type="file" onChange={handleFileChange} />
            </div>
        </>
    )
}