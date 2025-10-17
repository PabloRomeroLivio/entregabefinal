import UsersDao from "../dao/Users.dao.js";
import PetsDao from "../dao/Pets.dao.js";
import AdoptionsDao from "../dao/Adoptions.dao.js"; 

import UserRepository from "../repository/UserRepository.js";
import PetRepository from "../repository/PetRepository.js";
import AdoptionRepository from "../repository/AdoptionRepository.js";


const usersDao = new UsersDao();
const petsDao = new PetsDao();
const adoptionsDao = new AdoptionsDao();


export const usersService = new UserRepository(usersDao);
export const petsService = new PetRepository(petsDao);
export const adoptionsService = new AdoptionRepository(adoptionsDao);

