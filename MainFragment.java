package com.michael.petsie;

import android.support.v4.app.Fragment;

public class MainFragment extends Fragment {
private LoginButton authButton;

@Override
public View onCreateView(LayoutInflater inflater, 
        ViewGroup container, 
        Bundle savedInstanceState) {
    View view = inflater.inflate(R.layout.activity_petsie, container, false);

    authButton = (LoginButton) view.findViewById(R.id.authButton);
    authButton.setApplicationId(getString(R.string.app_id));

    return view;
} // end of onCreateView method
} // end of class MainFragment










