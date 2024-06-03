import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Box, Flex, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Main from "./pages/Main.jsx";

const Navbar = () => (
  <Box bg="teal.500" p={4}>
    <Flex justify="space-between" align="center">
      <Link as={RouterLink} to="/" color="white" fontWeight="bold" fontSize="lg">
        Home
      </Link>
      <Link as={RouterLink} to="/main" color="white" fontWeight="bold" fontSize="lg">
        Main
      </Link>
    </Flex>
  </Box>
);

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route exact path="/main" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
