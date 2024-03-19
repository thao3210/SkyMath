import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { IconButton, ThemeProvider, Typography } from "@mui/material";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import TeacherCard from "../../components/Card/CardTeacher";
import TeacherServices from "../../services/TeacherService";
import backgroundImage from '../../assets/images/skybgr.png'
import styles from "./styles";

const InforTeacher = () => {
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState("left");
  const cardsPerPage = 4;

  const fetchTeachers = async () => {
    try {
      const response = await TeacherServices.getListTeacher();
      // console.log("Teacher data response:", response.data);
      if (response.status === 200) {
        setCards(response.data);
      } else {
        console.error("Error response status", response.status)
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleNextPage = () => {
    setSlideDirection("left");
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setSlideDirection("right");
    setCurrentPage((prevPage) => prevPage - 1);
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const containerWidth = cardsPerPage * 300; // 250px per card

  return (
    <ThemeProvider theme={styles}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          backgroundImage: `url(${backgroundImage})`, // Set the background image
          backgroundSize: "cover",
        }}
      >
        <Typography
          sx={{
            fontSize: 30,
            fontFamily: 'Quicksand, sans-serif',
            textAlign: "center",
          }}
        >
          Đội Ngũ Giáo Viên
        </Typography>
        <Box
          sx={{
            borderBottom: "4px solid #78b9f5",
            paddingBottom: "10px",
            width: "10%",
            borderRadius: "2px"
          }}
        >
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
            height: "400px",
            width: "100%",
            marginTop: "40px",
          }}
        >
          <IconButton
            onClick={handlePrevPage}
            disableRipple={true}
            sx={styles.MuiButton}
            disabled={currentPage === 0}
          >
            <ArrowBackIosRoundedIcon sx={styles.IconButton} />
          </IconButton>
          <Box sx={{ width: `${containerWidth}px`, height: "100%" }}>
            {cards.map((teacher, index) => (
              <Box
                key={`${teacher.id}-${index}`}
                sx={{
                  width: "100%",
                  height: "100%",
                  display: currentPage === index ? "block" : "none",
                }}
              >
                <Slide direction={slideDirection} in={currentPage === index}>
                  <Stack
                    spacing={2}
                    direction="row"
                    alignContent="center"
                    justifyContent="center"
                    sx={{ width: "100%", height: "100%" }}
                  >
                    {cards
                      .slice(
                        index * cardsPerPage,
                        index * cardsPerPage + cardsPerPage
                      )
                      .map((teacher) => (
                        <Box key={teacher.id}>
                          <TeacherCard teacher={teacher} />
                        </Box>
                      ))}
                  </Stack>
                </Slide>
              </Box>
            ))}
          </Box>
          <IconButton
            onClick={handleNextPage}
            disableRipple={true}
            sx={styles.MuiButton}
            disabled={
              currentPage >= Math.ceil((cards.length || 0) / cardsPerPage) - 1
            }
          >
            <ArrowForwardIosRoundedIcon sx={styles.IconButton} />
          </IconButton>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default InforTeacher;
