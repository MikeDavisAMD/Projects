import React from 'react'
import { useThemeContext } from './ThemeContext'
import { ArrowRight } from '@mui/icons-material'
import sudoku from '../Assets/icons/sudoku.png'
import crosswords from '../Assets/icons/crossword.png'
import wordsearch from '../Assets/icons/wordsearch.png'
import minesweeper from '../Assets/icons/minesweeper.png'
import memorymatch from '../Assets/icons/memory-game.png'
import twoGame from '../Assets/icons/2048game.png'
import { Avatar, Box, Card, CardActionArea, CardContent, Grid, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const PuzzleList = () => {
    const {theme} = useThemeContext()
    const navigate = useNavigate()

    const PUZZLESLIST = [
        {avatar: sudoku, name: 'Sudoku', click: () => navigate('/Puzzles/Sudoku')},
        {avatar: crosswords, name:'Cross-Word', click: () => navigate('/Puzzles/Cross-Word')},
        {avatar: wordsearch, name: 'Word-Search', click: () => navigate('/Puzzles/Word-Search')},
        {avatar: minesweeper, name: 'Minesweeper', click: () => navigate('/Puzzles/Minesweeper')},
        {avatar: memorymatch, name: 'Memory Match', click: () => navigate('/Puzzles/Memory-Match')},
        {avatar: twoGame, name: '2048 Game', click: () => navigate('/Puzzles/2048')},
    ]
  return (
    <Card sx={{borderRadius:'15px', background: theme.cardBg, border:theme.cardBorder}}>
        <CardContent>
            <Box sx={{p:3}}>
                <Typography variant='span' sx={{fontWeight:'bolder',fontSize:'25px',color: theme.primaryText}}>Puzzles & Games</Typography>
            </Box>
            {PUZZLESLIST.map((p,i) => (
                <Card key={i} sx={{borderRadius:'25px', background: theme.secondaryBg, border:theme.cardBorder, mb:2}}>
                <CardActionArea onClick={p.click}>
                    <CardContent>
                    <Box sx={{flexGrow:1, maxWidth: 345}}>
                        <Grid container alignItems='center'>
                        <Grid size={3}>
                            <Box>
                            <Avatar alt={p.name} src={p.avatar} sx={{height: 40, width:40}}/>
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
