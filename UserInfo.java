package com.michael.petsie;

public class UserInfo {
	private String id;
	private String name;
	private String firstName;
	private String lastName;
	private String userName;
	private String gender;
	private String locale;
	private String email;

	public UserInfo(String _id, String _name, String _fName, String _sName, String _uName, String _gen, String _loc, String _email){
		this.id = _id;
		this.name = _name;
		this.firstName = _fName;
		this.lastName = _sName;
		this.userName = _uName;
		this.gender = _gen;
		this.locale = _loc;
		this.email = _email;
	}
 
	public String getId(){
		return id;
	}
 
	public String getName(){
		return name;
	}
 
	public String getFirstName(){
		return firstName;
	}
 
	public String getLastName(){
		return lastName;
	}

	public String getUserName(){
		return userName;
	}

	public String getGender(){
		return gender;
	}
 
	public String getLocale(){
		return locale;
	}

	public String getEmail(){
		return email;
	}

}
