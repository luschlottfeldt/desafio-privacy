import styled from 'styled-components';

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  margin: 0 -${({ theme }) => theme.spacing.sm};
  list-style: none;
`;

export const Option = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
  min-height: 56px;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 0;
  border-radius: ${({ theme }) => theme.radii.md};
  background: transparent;
  text-align: left;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }

  &[aria-current='true'] {
    background: ${({ theme }) => theme.colors.primarySoft};
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
  }
`;

export const Name = styled.span`
  flex: 1;
`;
