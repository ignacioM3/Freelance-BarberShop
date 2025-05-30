import { z } from 'zod';
import { UserRole } from './use-role';
import { AppointmentStatus } from './appointment-status';

// --- Auth Schema ---
const authSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  password_confirmation: z.string(),
  confirmed: z.boolean(),
  role: z.enum([UserRole.ADMIN, UserRole.BARBER, UserRole.CLIENT] as const),
  token: z.string(),
});

type Auth = z.infer<typeof authSchema>;

// --- Auth Form Types ---
export type UserRegistrationForm = Pick<Auth, 'email' | 'name' | 'password' | 'password_confirmation'>;
export type UserLoginForm = Pick<Auth, 'email' | 'password'>;
export type UserLogged = Pick<User, 'email' | 'name' | 'role' | '_id' | 'haircuts' | 'instagram' | 'number' | 'address'>;
export type RequestConfirmationCodeForm = Pick<Auth, 'email'>;
export type ConfirmToken = Pick<Auth, 'token'>;
export type ForgotPasswordForm = Pick<Auth, 'email'>;
export type NewPasswordFormType = Pick<Auth, 'password' | 'password_confirmation'>;

// --- Branch Schema ---
export const branchSchema = z.object({
  _id: z.string(),
  name: z.string(),
  address: z.string(),
  open: z.string(),
  close: z.string(),
  barbers: z.array(
   z.object({
    _id: z.string(),
    name: z.string().optional()
   })
  ),
  prices: z.array(
    z.object({
      service: z.string(),
      price: z.number()
    })
  )
});

// --- Barber Schema ---
export const barberSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string().email(),
  confirmed: z.boolean(),
  role: z.string(),
  branch: branchSchema.optional(),
});

// --- User Schema ---
export const userSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string().email(),
  address: z.string().optional(),
  confirmed: z.boolean(),
  haircuts: z.number(),
  instagram: z.string().optional(),
  number: z.number().optional().nullable(),
  password: z.string(),
  blocked: z.boolean().optional(),
  role: z.enum([UserRole.ADMIN, UserRole.BARBER, UserRole.CLIENT] as const),
});

export type User = z.infer<typeof userSchema>;

// --- User Form Types ---
export type UserListType = Pick<User, 'email' | 'name' | 'confirmed' | 'role' | '_id' | 'haircuts' | 'instagram' | 'number' | 'blocked'>;
export type UserCreateForm = Pick<User, 'name' | 'email' | 'password'>;
export type UserUpdateAdmin = Pick<User, 'name' | 'instagram' | 'number'  | '_id'>
export type UserUpdateAdminForm = Omit<UserUpdateAdmin, 'number' | '_id'> & { number?: string };
export type UserUpdateProfileForm = Pick<User, '_id' | 'number' | 'instagram' | 'address'>;

export type UserBarberListType = {
  _id: string;
  name: string;
  number?: number | null;
  role: string;
  confirmed: boolean;
  blocked?: boolean;
  branch?: {
    _id: string;
    name: string;
  } | null
};

// --- Get User List Schema ---
export const getUserListSchema = z.object({
  users: z.array(userSchema),
  totalUsers: z.number(),
});

// --- Get Barber List Schema ---
export const getBarberListSchema = z.object({
  users: z.array(
    z.object({
      _id: z.string(),
      number: z.number().nullable().optional(),
      name: z.string(),
      instagram: z.string().optional(),
      confirmed: z.boolean(),
      blocked: z.boolean().optional(),
      role: z.enum([UserRole.ADMIN, UserRole.BARBER, UserRole.CLIENT] as const),
      branch: z
        .object({
          _id: z.string(),
          name: z.string(),
          address: z.string(),
        })
        .optional()
        .nullable(),
    })
  ),
  totalUsers: z.number(),
});


// --- Get Branch List Schema ---
export const getBranchListSchema = z.array(
  z.object({
    _id: z.string(),
    name: z.string(),
    address: z.string(),
    barbers: z.array(
       z.object({
        _id: z.string(),
        name: z.string()
       })
    ),
  })
)

//Type for branch
export type Branch = z.infer<typeof branchSchema>;
export type getBranchByIdType  = Pick<Branch, '_id'>
export type BranchListType = Pick<Branch, '_id' | 'address' | 'name' | 'barbers'>
export type getDetailsBranch = Pick<Branch, '_id' | 'address' | 'barbers' | 'name'>
export type BarberOutBranch = Pick<User, '_id' | 'name'>
export type ListBarberInBranch = Pick<User, '_id' | 'name'>
export type formDataCreateBranch = Pick<Branch, 'address' | 'name' | 'close' | 'open'> & {
  claritos: number;
  corte: number;
  global: number;
};
export type editBarberForm = Pick<User, 'name' | 'number' | 'email'>

export type CreateBarberForm = {
  name: string;
  numero?: number;
  email: string;
  password: string;
  password_confirmation: string
}


export type FormDataCreateBranchApi = Pick<Branch, 'name' | "address" | "close" | 'open' | 'prices'>


// Appointment Schema
export const appointmentSchema = z.object({
  _id: z.string(),
  name: z.string().optional(),
  barberId: z.string(),
  branchId: z.string(),
  timeSlot: z.string(),
  day: z.string(),
  status: z.enum([AppointmentStatus.AVAILABLE, AppointmentStatus.BOOKED, AppointmentStatus.CANCELED, AppointmentStatus.COMPLETED] as const),
  manual: z.boolean(),
  instagram: z.string().optional(),
  whatsapp: z.string().optional(),
  price: z.number(),
  service: z.string(),
  details: z.string().optional(),

})

const populatedUserSchema = z.object({
  _id: z.string(),
  name: z.string(),
});


export type Appointment = z.infer<typeof appointmentSchema>;
export type createAppointmentForm = Pick<Appointment, 'name' | 'instagram' | 'whatsapp' | 'details' | 'service' | 'price'>;
export type createAppointmentApiType = Pick<Appointment,  'day' | 'timeSlot' | 'price' | 'manual' | 'status' | 'service' | 'name' | 'instagram' | 'whatsapp' | 'details' | 'barberId'>;
export type updateStatusAppointmentApiType = Pick<Appointment, 'status'>;
export type deleteAppointmentApiType = Pick<Appointment, '_id'>;
export type AppointmentPopulated = z.infer<typeof appointmentPopulatedSchema>;
export const appointmentPopulatedSchema = appointmentSchema.extend({
  barberId: populatedUserSchema,
  branchId: populatedUserSchema,
});

/* Profit */
/* Get profit schema */
export const getProfitSchema = z.array(
  z.object({
    branchId: z.string(),
    branchName: z.string(),
    totalProfit: z.number(),
    appointments: z.array(
      z.object({
        _id: z.string(),
        barberId: z.string(),
        day: z.string(),
        manual: z.boolean(),
        price: z.number(),
        service: z.string(),
        status: z.string(),
      })
    ),
  })
);

export type profitSchemaType = z.infer<typeof getProfitSchema >
export type getProfitByMonthFormData = {month: string, year:string}
export type profitAppointment = Omit<Appointment, "barberId" | 'timeSlot' | 'instagram' | 'whatsapp' | 'details' | 'branchId'>



type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

/* public type */

export type BranchPublicPrice = Pick<Branch, '_id' | 'name' | 'address' | 'prices' >