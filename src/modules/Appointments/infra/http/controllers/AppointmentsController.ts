import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateAppointmentService from '@modules/Appointments/services/CreateAppointmentService';
import FindAllAppointmentService from '@modules/Appointments/services/FindAllAppointmentService';

export default class AppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { day, month, year } = request.query;
    const listAppointments = container.resolve(FindAllAppointmentService);
    // console.log(user_id);
    const appointments = await listAppointments.execute({
      user_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.json(classToClass(appointments));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    // const user_id = request.user.id;
    const { date, user_id } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      date: parsedDate,
      user_id,
    });

    return response.json(appointment);
  }
}
