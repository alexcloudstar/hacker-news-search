import React, { ChangeEvent, FC, SetStateAction, useState } from 'react';
import SelectPropsType, {
	searchByTime,
	searchByType,
	searchByTypePosts
} from './SelectPropsType';
import { StyledSelect } from './style';

import { FormControl, MenuItem } from '@material-ui/core';
import { capitalizeFirstLetter } from 'src/utils';
import { useFetchPosts, usePostContext } from 'src/containers';
import {
	filterByDate,
	filterByScore,
	filterByDay,
	pastMonth,
	pastWeek,
	pastYear
} from 'src/utils/filters';

const CustomSelect: FC<SelectPropsType> = ({
	classes,
	searchBy,
	defaultValue
}): JSX.Element => {
	const [value, setValue] = useState(defaultValue);
	const { postItems, setPostItems } = usePostContext();
	const { fetchStories } = useFetchPosts();

	const handleChange = (
		e: ChangeEvent<{
			name?: string;
			value: unknown;
		}>
	) => {
		const target = e.target.value as SetStateAction<
			searchByTypePosts | searchByType | searchByTime
		>;

		setValue(target);

		if (target === 'date') setPostItems(filterByDate(postItems));
		if (target === 'popularity') setPostItems(filterByScore(postItems));
		if (target === 'last 24h') setPostItems(filterByDay(postItems));
		if (target === 'past week') setPostItems(pastWeek(postItems));
		if (target === 'past month') setPostItems(pastMonth(postItems));
		if (target === 'past year') setPostItems(pastYear(postItems));
		if (target === 'all time') fetchStories();
	};

	return (
		<FormControl>
			<StyledSelect
				labelId="demo-simple-select-helper-label"
				id="demo-simple-select-helper"
				value={value}
				onChange={(e) => handleChange(e)}
			>
				{searchBy.map((search) => (
					<MenuItem value={search} key={search}>
						{capitalizeFirstLetter(search)}
					</MenuItem>
				))}
			</StyledSelect>
		</FormControl>
	);
};

export default CustomSelect;
