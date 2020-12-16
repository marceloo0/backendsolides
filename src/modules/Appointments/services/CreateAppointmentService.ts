import { isBefore, getHours } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  date: Date;
  user_id: string;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({ date, user_id }: IRequest): Promise<Appointment> {
    // const appointmentDate = startOfHour(date);

    // if (isBefore(date, Date.now())) {
    //   throw new AppError("You can't create an appointemnt on a past date.");
    // }

    // if (getHours(date) < 8 || getHours(date) > 18) {
    //   throw new AppError(
    //     'You can only create appointments between 8am and 6pm',
    //   );
    // }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      date,
      user_id,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      user_id,
      date,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
