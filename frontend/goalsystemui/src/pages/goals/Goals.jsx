import React, { useState, useEffect, useContext} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import {
  Grid,
  Button,
  IconButton,
  Box,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { GoalCreateModal } from "../../components/goal modals/GoalCreateModal";
import { GoalEditModal } from "../../components/goal modals/GoalEditModal";
import { GoalRemoveModal } from "../../components/goal modals/GoalRemoveModal";
import { GoalViewModal } from "../../components/goal modals/GoalViewModal";
import {
  useGoalsList,
  useCreateGoal,
  useUpdateGoal,
  useRemoveGoal,
} from "../../hooks/goals/goals";
import { UserContext } from "../../services/authProvider";
import { hasAccess } from "../../helpers/determineObjectManipulationRights";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const Goals = () => {
  const user = useContext(UserContext);

  const navigate = useNavigate();
  const { teamId, memberId } = useParams();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { data } = useGoalsList(teamId, memberId);

  const [gridRows, setGridRows] = useState([]);
  const [showGoalViewModal, setShowGoalViewModal] = useState(false);
  const [showGoalEditModal, setShowGoalEditModal] = useState(false);
  const [showGoalRemoveModal, setShowGoalRemoveModal] = useState(false);
  const [showGoalCreateModal, setShowGoalCreateModal] = useState(false);
  const [goal, setGoal] = useState();

  const createGoal = useCreateGoal();
  const updateGoal = useUpdateGoal();
  const removeGoal = useRemoveGoal();

  useEffect(() => {
    setGridRows(data || []);
  }, [data]);

  const handleBackClick = () => {
    navigate(`/teams/${teamId}/members`);
  };

  const handleGoalView = (row) => {
    setGoal(row);
    setShowGoalViewModal(true);
  };

  const handleGoalEdit = (row) => {
    if (hasAccess(user.user, row.userId)) {
    setGoal(row);
    setShowGoalEditModal(true);
    }
  };

  const handleGoalRemove = (row) => {
    if (hasAccess(user.user, row.userId)) {
    setGoal(row);
    setShowGoalRemoveModal(true);
    }
  };

  const columns = [
    {
      field: "isCompleted",
      headerName: "Completed",
      minWidth: 100,
      renderCell: (params) => (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
          width="100%"
        >
          {params.row.isCompleted ? (
            <CheckCircleIcon sx={{ color: "green" }} />
          ) : (
            <CancelIcon sx={{ color: "red" }} />
          )}
        </Box>
      ),
    },
    {
      field: "id",
      headerName: "ID",
      minWidth: 50,
      flex: isSmallScreen ? 0 : 1,
    },
    {
      field: "title",
      headerName: "Title",
      minWidth: 100,
      flex: isSmallScreen ? 0 : 1,
    },
    {
      field: "description",
      headerName: "Description",
      minWidth: 150,
      flex: isSmallScreen ? 0 : 2,
    },
    {
      field: "createdDate",
      headerName: "Created Date",
      minWidth: 120,
      renderCell: (params) => params.row.createdDate.split("T")[0],
    },
    {
      field: "finishDate",
      headerName: "Finish Date",
      minWidth: 120,
      renderCell: (params) => params.row.finishDate.split("T")[0],
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      minWidth: 200,
      renderCell: (params) => (
        <Box display="flex" justifyContent="left" gap="0.5rem">
          <IconButton
            aria-label="view"
            sx={{ color: "blue" }}
            onClick={() => handleGoalView(params.row)}
          >
            <RemoveRedEyeIcon />
          </IconButton>
          <IconButton
            aria-label="edit"
            sx={{ color: "orange" }}
            onClick={() => handleGoalEdit(params.row)}
            disabled={!hasAccess(user.user, params.row.userId)}
          >
            <ModeEditIcon />
          </IconButton>
          <IconButton
            aria-label="remove"
            sx={{ color: "red" }}
            onClick={() => handleGoalRemove(params.row)}
            disabled={!hasAccess(user.user, params.row.userId)}
          >
            <DeleteForeverIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box padding={isSmallScreen ? "1rem" : "2rem"}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Goals for Member {memberId}
      </Typography>
      <Box
        display="flex"
        justifyContent="center"
        marginBottom={isSmallScreen ? "1rem" : "1rem"}
      >
        <Button variant="contained" onClick={handleBackClick}>
          Back
        </Button>
        <Button
          variant="contained"
          sx={{ ml: 2 }}
          onClick={() => setShowGoalCreateModal(true)}
          disabled={!hasAccess(user.user, gridRows[0]?.userId)}
        >
          Add Goal
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
              email: false,
              joinDate: false,
            }}
            disableColumnMenu
          />
        </Box>
      </Grid>
      {showGoalViewModal && (
        <GoalViewModal
          open={showGoalViewModal}
          handleClose={() => setShowGoalViewModal(false)}
          goal={goal}
        />
      )}
      {showGoalEditModal && (
        <GoalEditModal
          open={showGoalEditModal}
          handleClose={() => setShowGoalEditModal(false)}
          goal={goal}
          onUpdateGoal={updateGoal}
          teamId={teamId}
          memberId={memberId}
        />
      )}
      {showGoalRemoveModal && (
        <GoalRemoveModal
          open={showGoalRemoveModal}
          handleClose={() => setShowGoalRemoveModal(false)}
          goal={goal}
          onRemoveGoal={removeGoal}
          teamId={teamId}
          memberId={memberId}
        />
      )}
      {showGoalCreateModal && (
        <GoalCreateModal
          open={showGoalCreateModal}
          handleClose={() => setShowGoalCreateModal(false)}
          onCreateGoal={createGoal}
          teamId={teamId}
          memberId={memberId}
        />
      )}
    </Box>
  );
};

export default Goals;
