import { Box, Button, Divider, Grid } from '@mui/material'
import React, { useCallback, useState } from 'react'
import { Done } from '@mui/icons-material';
import Cropper from 'react-easy-crop';

export const ImageEditor = ({ image, setImage, theme, setEdit }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImg = useCallback(async (imageSrc, pixelCrop) => {
    const createImage = (url) =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.setAttribute('crossOrigin', 'anonymous'); // for CORS
        img.onload = () => resolve(img);
        img.onerror = (error) => reject(error);
        img.src = url;
      });

    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) return reject(new Error('Canvas is empty'));
        blob.name = 'cropped.jpeg';
        const croppedImageUrl = window.URL.createObjectURL(blob);
        resolve(croppedImageUrl);
      }, 'image/jpeg');
    });
  }, []);

  const handleDone = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);
      setImage(croppedImage);
      setEdit(false);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, image, setEdit, setImage, getCroppedImg]);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Box sx={{
            position: 'relative',
            height: { lg: 400, md: 400, sm: 300, xs: 200 },
            width: { lg: 400, md: 400, sm: 300, xs: 200 },
            background: theme.cardBg,
            overflow: 'hidden',
            borderRadius: 2,
          }}>
            <Cropper
              image={image}
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
        </Grid>
        <Grid size={12}>
          <Divider color={theme.secondaryText} /><br />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant='outlined' onClick={handleDone}
              startIcon={<Done />}
              sx={{
                color: theme.primaryAccent,
                borderColor: theme.primaryAccent,
                '&:hover': {
                  backgroundColor: theme.hoverAccent,
                  borderColor: theme.hoverAccent,
                  color: theme.primaryBg
                }
              }}>done</Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
