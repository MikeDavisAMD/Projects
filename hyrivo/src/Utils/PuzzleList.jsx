import React from 'react'
import { useThemeContext } from './ThemeContext'
import { ArrowRight } from '@mui/icons-material'
import sudoku from '../Assets/icons/sudoku.png'
import crosswords from '../Assets/icons/crossword.png'
import wordsearch from '../Assets/icons/wordsearch.png'
import chess from '../Assets/icons/chess.png'
import tetris from '../Assets/icons/tetris.png'
import { Avatar, Box, Card, CardActionArea, CardContent, Grid, Typography } from '@mui/material'

export const PuzzleList = () => {
    const {theme} = useThemeContext()

    const PUZZLESLIST = [
        {avatar: sudoku, name: 'Sudoku'},
        {avatar: crosswords, name:'Cross-Word'},
        {avatar: wordsearch, name: 'Word-Search'},
        {avatar: chess, name: 'Chess'},
        {avatar: tetris, name: 'tetris'}
    ]
  return (
    <Card sx={{borderRadius:'15px', background: theme.cardBg, border:theme.cardBorder}}>
        <CardContent>
            <Box sx={{p:3}}>
                <Typography variant='span' sx={{fontWeight:'bolder',fontSize:'25px',color: theme.primaryText}}>Puzzles & Games</Typography>
            </Box>
            {PUZZLESLIST.map((p,i) => (
                <Card key={i} sx={{borderRadius:'25px', background: theme.secondaryBg, border:theme.cardBorder, mb:2}}>
                <CardActionArea>
                    <CardContent>
                    <Box sx={{flexGrow:1, maxWidth: 345}}>
                        <Grid container alignItems='center'>
                        <Grid size={3}>
                            <Box>
                            <Avatar alt='sudoku' src={p.avatar} sx={{height: 40, width:40}}/>
                            </Box>
                        </Grid>
                        <Grid size={8}>
                            <Box>
                            <Typography variant='span' sx={{fontSize:'15px',color: theme.primaryText}}>{p.name}</Typography>
                            </Box>
                        </Grid>
                        <Grid size={1}>
                            <Box sx={{color: theme.mutedText}}>
                            <ArrowRight/>
                            </Box>
                        </Grid>
                        </Grid>
                    </Box>
                    </CardContent>
                </CardActionArea>
                </Card>
            ))}
        </CardContent>
        </Card>
  )
}
