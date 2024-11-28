import React, { useState, useEffect, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Grid,
  IconButton,
  Box,
  useMediaQuery,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { TeamViewModal } from "../../components/team modals/TeamViewModal";
import { TeamEditModal } from "../../components/team modals/TeamEditModal";
import { TeamRemoveModal } from "../../components/team modals/TeamRemoveModal";
import { TeamCreateModal } from "../../components/team modals/TeamCreateModal";
import {
  useTeamsList,
  useCreateTeam,
  useUpdateTeam,
  useRemoveTeam,
} from "../../hooks/teams/teams";
import { UserContext } from "../../services/authProvider";

import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { hasAccess } from "../../helpers/determineObjectManipulationRights";

const Teams = () => {
  const user = useContext(UserContext);
  const { data } = useTeamsList();
  const createTeam = useCreateTeam();
  const updateTeam = useUpdateTeam();
  const removeTeam = useRemoveTeam();

  const [gridRows, setGridRows] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleTeamView = (team) => {
    setSelectedTeam(team);
    setShowViewModal(true);
  };

  const handleTeamEdit = (team) => {
    if(hasAccess(user.user, team.userId)){
      setSelectedTeam(team);
      setShowEditModal(true);
    }
  };

  const handleTeamRemove = (team) => {
    if(hasAccess(user.user, team.userId)){
      setSelectedTeam(team);
      setShowRemoveModal(true);
    }
  };

  useEffect(() => {
    setGridRows(data || []);
  }, [data]);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      minWidth: 50,
      flex: isSmallScreen ? 0 : 1,
    },
    {
      field: "title",
      headerName: "Title",
      minWidth: 120,
      flex: isSmallScreen ? 0 : 1,
    },
    {
      field: "office",
      headerName: "Office",
      minWidth: 100,
      flex: isSmallScreen ? 0 : 1,
    },
    {
      field: "division",
      headerName: "Division",
      minWidth: 100,
      flex: isSmallScreen ? 0 : 1,
    },
    {
      field: "teamLeaderName",
      headerName: "Team Leader",
      minWidth: 150,
      flex: isSmallScreen ? 0 : 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      minWidth: 200,
      renderCell: (params) => {
        console.log(params.row.userId)
        return (
        <Box display="flex" justifyContent="left" gap="0.5rem">
          <IconButton
            aria-label="view"
            sx={{ color: "blue" }}
            onClick={() => handleTeamView(params.row)}
          >
            <RemoveRedEyeIcon />
          </IconButton>
          <IconButton
            aria-label="edit"
            sx={{ color: "orange" }}
            onClick={() => handleTeamEdit(params.row)}
            disabled={!hasAccess(user.user, params.row.userId)}
          >
            <ModeEditIcon />
          </IconButton>
          <IconButton
            aria-label="remove"
            sx={{ color: "red" }}
            onClick={() => handleTeamRemove(params.row)}
            disabled={!hasAccess(user.user, params.row.userId)}
          >
            <DeleteForeverIcon />
          </IconButton>
        </Box>
          )}
    },
  ];

  return (
    <Box padding={isSmallScreen ? "1rem" : "2rem"}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Teams
      </Typography>
      <Box
        display="flex"
        justifyContent="center"
        marginBottom={isSmallScreen ? "1rem" : "1rem"}
      >
        <Button variant="contained" onClick={() => setShowCreateModal(true)}>
          Add Team
        </Button>
      </Box>
      <Grid container justifyContent="center">
        <Box
          style={{
            width: "100%",
            overflowX: isSmallScreen ? "auto" : "visible",
            maxWidth: isSmallScreen ? "100%" : "60rem",
          }}
        >
          <DataGrid
            autoHeight
            rows={gridRows}
            columns={columns}
            pageSizeOptions={[10]}
            columnVisibilityModel={{
              id: false,
              division: false,
            }}
            disableColumnMenu
          />
        </Box>
      </Grid>
      {showCreateModal && (
        <TeamCreateModal
          open={showCreateModal}
          handleClose={() => setShowCreateModal(false)}
          onCreateTeam={createTeam}
        />
      )}
      {showEditModal && (
        <TeamEditModal
          open={showEditModal}
          handleClose={() => setShowEditModal(false)}
          team={selectedTeam}
          onUpdateTeam={updateTeam}
        />
      )}
      {showRemoveModal && (
        <TeamRemoveModal
          open={showRemoveModal}
          handleClose={() => setShowRemoveModal(false)}
          team={selectedTeam}
          onRemoveTeam={removeTeam}
        />
      )}
      {showViewModal && (
        <TeamViewModal
          open={showViewModal}
          handleClose={() => setShowViewModal(false)}
          team={selectedTeam}
        />
      )}
    </Box>
  );
};

export default Teams;
