import { useDispatch } from 'react-redux';
import { addTournament, editTournament } from '../actions/tournaments';

type HookProps = {
  id?: string;
  name: string;
};

const useEditCard = () => {
  const dispatch = useDispatch();

  const onEdit = (props?: HookProps) => {
    const newName = window?.prompt('New Tournament Name:', props?.name);

    if (newName !== null) {
      dispatch(
        props?.id
          ? editTournament({ id: props.id, value: newName })
          : addTournament({ value: newName })
      );
    }
  };

  return { onEdit };
};

export default useEditCard;
