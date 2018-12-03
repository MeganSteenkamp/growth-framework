import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Flex, Box, Spinner, MessageBox, Text } from '@components';
import { navigate } from '@reach/router';

const colors = {
  dark: 'lightskyblue',
  light: 'aliceblue',
};

const queryRoles = gql`
  query Roles($id: String) {
    roles(id: $id) {
      id
      title
    }
  }
`;

const RoleBox = ({ width = '30%', selected, role, labels }) => {
  const { id, title } = role;
  const bg = (labels || selected === id) ? colors.dark : colors.light;
  return (
    <Flex justifyContent="space-between">
      <Box />
      <Box
        m={[1]}
        p={[2]}
        width={width}
        minHeight={16}
        bg={bg}
        onClick={() => navigate(`/role/${id}`)}
      >
        {labels ? <Text align="center">{title}</Text> : null}
      </Box>
      <Box />
    </Flex>
  );
};

const SplitBox = ({ width = '50%', selected, roles, labels }) => {
  const bg =
    (labels || selected === roles[0].id || selected === roles[1].id)
      ? colors.dark
      : colors.light;
  return (
    <Flex justifyContent="space-between">
      <Box />
      <Box m={[1]}  width={width} minHeight={16} bg={bg}>
        <Flex>
          <Box
            p={[2]}
            width={'60%'}
            onClick={() => navigate(`/role/${roles[0].id}`)}
          >
            {labels ? <Text align="center">{roles[0].title}</Text> : null}
          </Box>
          <Box
            p={[2]}
            width={'40%'}
            onClick={() => navigate(`/role/${roles[1].id}`)}
          >
            {labels ? <Text align="center">{roles[1].title}</Text> : null}
          </Box>
        </Flex>
      </Box>
      <Box />
    </Flex>
  );
};

const Map = ({ selected, labels = true }) => {
  return (
    <Query query={queryRoles} variables={{ id: 'software-engineering' }}>
      {({ loading, error, data }) => {
        if (loading) return <Spinner />;

        if (error) {
          console.error(error);
          return (
            <MessageBox title="Error">Check console for details</MessageBox>
          );
        }

        const { roles } = data;

        return (
          <Flex flexDirection="column">
            <RoleBox selected={selected} role={roles[0]} labels={labels} />
            <RoleBox selected={selected} role={roles[1]} labels={labels} />
            <RoleBox selected={selected} role={roles[2]} labels={labels} />
            <SplitBox
              wselectedth={'60%'}
              selected={selected}
              roles={[roles[3], roles[4]]}
              labels={labels}
            />
            <Flex>
              <Flex width={'50%'} flexDirection="column">
                <RoleBox
                  width={'60%'}
                  selected={selected}
                  role={roles[5]}
                  labels={labels}
                />
                <RoleBox
                  width={'60%'}
                  selected={selected}
                  role={roles[6]}
                  labels={labels}
                />
              </Flex>
              <Flex width={'50%'} flexDirection="column">
                <RoleBox
                  width={'60%'}
                  selected={selected}
                  role={roles[7]}
                  labels={labels}
                />
                <RoleBox
                  width={'60%'}
                  selected={selected}
                  role={roles[8]}
                  labels={labels}
                />
              </Flex>
            </Flex>
          </Flex>
        );
      }}
    </Query>
  );
};

Map.displayName = 'Map';

Map.propTypes = {
  selected: PropTypes.string,
};

export default Map;
