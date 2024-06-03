import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Box, Flex, Link, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Main from "./pages/Main.jsx";
import { useSupabaseAuth, SupabaseAuthProvider, SupabaseAuthUI } from "./integrations/supabase/auth.jsx";
import { useState } from "react";

const Navbar = () => {
  const { session, logout } = useSupabaseAuth();
  return (
    <Box bg="teal.500" p={4}>
      <Flex justify="space-between" align="center">
        <Link as={RouterLink} to="/" color="white" fontWeight="bold" fontSize="lg">
          Home
        </Link>
        {session && (
          <>
            <Link as={RouterLink} to="/main" color="white" fontWeight="bold" fontSize="lg">
              Main
            </Link>
            <Button onClick={logout} color="white" variant="link">
              Logout
            </Button>
          </>
        )}
      </Flex>
    </Box>
  );
};

function App() {
  const { session } = useSupabaseAuth();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          exact
          path="/"
          element={
            session ? (
              <Index />
            ) : (
              showLogin ? (
                <SupabaseAuthUI />
              ) : (
                <Button onClick={() => setShowLogin(true)}>Login</Button>
              )
            )
          }
        />
        <Route exact path="/main" element={session ? <Main /> : <Button onClick={() => setShowLogin(true)}>Login</Button>} />
      </Routes>
    </Router>
  );
}

export default function RootApp() {
  return (
    <SupabaseAuthProvider>
      <App />
    </SupabaseAuthProvider>
  );
}