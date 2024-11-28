import React, { useState, useEffect, useContext } from "react";
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
import { MemberViewModal } from "../../components/member modals/MemberViewModal";
import { MemberEditModal } from "../../components/member modals/MemberEditModal";
import { MemberRemoveModal } from "../../components/member modals/MemberRemoveModal";
import { MemberCreateModal } from "../../components/member modals/MemberCreateModal";
import {
  useCreateMember,
  useRemoveMember,
  useMembersList,
  useUpdateMember,
} from "../../hooks/members/members";
import { UserContext } from "../../services/authProvider";
import { hasAccess } from "../../helpers/determineObjectManipulationRights";

import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import AssignmentIcon from "@mui/icons-material/Assignment";

const Members = () => {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const { teamId } = useParams();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { data } = useMembersList(teamId);

  const [gridRows, setGridRows] = useState([]);
  const [showMemberViewModal, setShowMemberViewModal] = useState(false);
  const [showMemberEditModal, setShowMemberEditModal] = useState(false);
  const [showMemberRemoveModal, setShowMemberRemoveModal] = useState(false);
  const [showMemberCreateModal, setShowMemberCreateModal] = useState(false);
  const [member, setMember] = useState();

  const updateMember = useUpdateMember();
  const createMember = useCreateMember();
  const removeMember = useRemoveMember();

  useEffect(() => {
    setGridRows(data || []);
  }, [data]);

  const handleMemberView = (row) => {
    setMember(row);
    setShowMemberViewModal(true);
  };

  const handleMemberEdit = (row) => {
    if (hasAccess(user.user, row.userId)) {
      setMember(row);
      setShowMemberEditModal(true);
    }
  };

  const handleMemberRemove = (row) => {
    if (hasAccess(user.user, row.userId)) {
      setMember(row);
      setShowMemberRemoveModal(true);
    }
  };

  const handleNavigateMemberGoals = (row) => {
    navigate(`/teams/${teamId}/members/${row.id}/goals`);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      minWidth: 50,
      flex: isSmallScreen ? 0 : 1,
    },
    {
      field: "name",
      headerName: "First Name",
      minWidth: 100,
      flex: isSmallScreen ? 0 : 1,
    },
    {
      field: "surname",
      headerName: "Last Name",
      minWidth: 100,
      flex: isSmallScreen ? 0 : 1,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 100,
      flex: isSmallScreen ? 0 : 1,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 150,
      flex: isSmallScreen ? 0 : 1,
    },
    {
      field: "joinDate",
      headerName: "Join Date",
      minWidth: 120,
      renderCell: (params) => params.row.joinDate.split("T")[0],
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      minWidth: 200,
      renderCell: (params) => (
        <Box display="flex" justifyContent="left" gap="0.5rem">
          <IconButton
            aria-label="goals"
            sx={{ color: "green" }}
            onClick={() => handleNavigateMemberGoals(params.row)}
          >
            <AssignmentIcon />
          </IconButton>
          <IconButton
            aria-label="view"
            sx={{ color: "blue" }}
            onClick={() => handleMemberView(params.row)}
          >
            <RemoveRedEyeIcon />
          </IconButton>
          <IconButton
            aria-label="edit"
            sx={{ color: "orange" }}
            onClick={() => handleMemberEdit(params.row)}
            disabled={!hasAccess(user.user, params.row.userId)}
          >
            <ModeEditIcon />
          </IconButton>
          <IconButton
            aria-label="remove"
            sx={{ color: "red" }}
            onClick={() => handleMemberRemove(params.row)}
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
        Members List for Team {teamId}
      </Typography>
      <Box
        display="flex"
        justifyContent="center"
        marginBottom={isSmallScreen ? "1rem" : "1rem"}
      >
        <Button
          variant="contained"
          onClick={() => setShowMemberCreateModal(true)}
          disabled={!hasAccess(user.user, gridRows[0]?.userId)}
        >
          Add Member
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
      {showMemberViewModal && (
        <MemberViewModal
          open={showMemberViewModal}
          handleClose={() => setShowMemberViewModal(false)}
          member={member}
        />
      )}
      {showMemberEditModal && (
        <MemberEditModal
          open={showMemberEditModal}
          handleClose={() => setShowMemberEditModal(false)}
          member={member}
          onUpdateMember={updateMember}
          teamId={teamId}
        />
      )}
      {showMemberRemoveModal && (
        <MemberRemoveModal
          open={showMemberRemoveModal}
          handleClose={() => setShowMemberRemoveModal(false)}
          member={member}
          onRemoveMember={removeMember}
          teamId={teamId}
        />
      )}
      {showMemberCreateModal && (
        <MemberCreateModal
          open={showMemberCreateModal}
          handleClose={() => setShowMemberCreateModal(false)}
          onCreateMember={createMember}
          teamId={teamId}
        />
      )}
    </Box>
  );
};

export default Members;
